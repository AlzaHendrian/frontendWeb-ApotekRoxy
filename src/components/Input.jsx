const Input = ({placeholder, value, onChangeText}) => {
    return (
        <input
        type="text"
        id="input"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        value={value}
        onChange={onChangeText}
        />
    )
}

export default Input