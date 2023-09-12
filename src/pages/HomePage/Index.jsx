import { useEffect, useState } from "react"
import SubMenu from "../../components/SubMenu"
import { API } from "../../config/Api"
import Leftbar from "./Leftbar"
import Table from "../../components/Table"

const HomePage = () => {
    const [dataBarang, setDataBarang] = useState([])
    const[isUpdate, setIsUpdate] = useState(false)
    const[search, setSearch] = useState('')
    const[debounceTimeout, setDebounceTimeout] = useState(null)

    const debounceSearch = (query) => {
        if(debounceTimeout) {
            clearTimeout(debounceTimeout)
        }

        const newTimeout = setTimeout(() => {
            getData(query)
        }, 500)
        setDebounceTimeout(newTimeout)
    }

    const [formData, setFormData] = useState({
        id: '',
        nama: '',
        harga: '',
        qty: '',
    })

    const onChangeText = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const clearFormData = () => {
        setFormData({
            id: '',
            nama: '',
            harga: '',
            qty: '',
        }, setIsUpdate(false))
    }

    const handleUpdate = (item) => {
        setFormData(item)
        setIsUpdate(true)
        console.log(item)
    }

    const submitData = async () => {
        const postData = new URLSearchParams();
        postData.append('id', formData.id)
        postData.append('nama', formData.nama)
        postData.append('harga', formData.harga)
        postData.append('qty', formData.qty)

        try{
            const response = await API.post('/barang', 
            postData.toString(),
            )
            console.log(response.data.data)
            alert('success submit')
            getData()
            clearFormData()
        }catch (err) {
            console.log(JSON.stringify(err, null, 2))
        }
    }

    const getData = async() => {
        try {
            const response = await API.get(`/barang?search_name=${search}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(response.data.data)
            setDataBarang(response.data.data)
        }catch (err) {
            console.log(JSON.stringify(err, null, 2));
        }
    }
    useEffect(() => {
        debounceSearch(search)
    }, [search])

    const deleteData = async id => {
        try {
            const response = await API.delete(`/barang/${id}`)
            if(response){
                alert('data deleted successfully')
            }
            getData();
        }catch (err) {
            console.log(JSON.stringify(err, null, 2));
        }
    }


    const updateData = async () => {
        const dataUpdate = new URLSearchParams();
        dataUpdate.append('id', formData.id)
        dataUpdate.append('nama', formData.nama)
        dataUpdate.append('harga', formData.harga)
        dataUpdate.append('qty', formData.qty)

        try {
            const response = await API.put(`/barang/${formData.id}`, 
            dataUpdate.toString()
            )
            if(response) {
                alert("success updating barang")
            }
            console.log(response)
            getData();
            clearFormData();
        }catch(err) {
            console.log(JSON.stringify(err, null, 2));
        }
    }
    return (
            <div className="w-[100%] h-[100vh] flex">
                <Leftbar/>
                <div className="mx-auto">
                    <div className="grid grid-cols-2 gap-8">
                        <SubMenu 
                        name='Master barang'
                        submitData={submitData}
                        onChangeText={onChangeText}
                        formData={formData}
                        isUpdate={isUpdate}
                        updateData={updateData}
                        />
                        <SubMenu name='Transaksi'/>
                    </div>
                    <div>
                        <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5"
                        placeholder="cari barang ..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}/>
                    </div>
                    <div className="flex justify-center">
                        <Table 
                        dataBarang={dataBarang}
                        handleUpdate={handleUpdate}
                        deleteData={deleteData}
                        />
                    </div>
                </div>
            </div>
    )
}

export default HomePage