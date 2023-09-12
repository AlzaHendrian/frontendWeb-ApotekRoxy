import Input from "./Input"
import Button from "./button"


const SubMenu = ({name, submitData, onChangeText, formData, isUpdate, updateData}) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mt-8">{name}</h1>
            <div className="grid grid-cols-2 gap-4 mt-5">
                {name === 'Master barang' ? (
                    <>
                        <Input 
                        placeholder='ID barang'
                        value={formData.id}
                        onChangeText={(e) => onChangeText('id', e.target.value)}
                        />
                        <Input 
                        placeholder='Nama barang'
                        value={formData.nama}
                        onChangeText={(e) => onChangeText('nama', e.target.value)}
                        />
                        <Input 
                        placeholder='Harga'
                        value={formData.harga}
                        onChangeText={(e) => onChangeText('harga', e.target.value)}
                        />
                        <Input 
                        placeholder='Quantity'
                        value={formData.qty}
                        onChangeText={(e) => onChangeText('qty', e.target.value)}
                        />
                    </>
                ): (
                    <>
                        <Input placeholder='ID transaksi'/>
                        <Input placeholder='Tanggal transaksi'/>
                        <Input placeholder='Total'/>
                    </>
                )}
            </div>
            <div className="grid grid-cols-1 mt-3">
                <Button 
                // submitData={submitData}
                isUpdate={isUpdate}
                // updateData={updateData}
                onSubmit={isUpdate ? updateData : submitData}
                />
            </div>
        </div>
    )
}

export default SubMenu