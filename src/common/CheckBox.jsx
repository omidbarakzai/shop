function CheckBox({ id, name, value, onChange, checked, label }) {
  return (
    <>

  <div className="flex items-center gap-x-2 cursor-pointer  ">
  <input
    type="checkbox"
    name={name}
    id={id}
    checked={checked}
    value={value}
    onChange={onChange}
    className="className=w-5 h-5 flex items-center justify-center rounded-md border-2 border-gray-400 bg-gray-200 
                    peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all duration-300"
  />
  <label htmlFor={id} className="cursor-pointer  text-lg text-gray-700 hover:text-orange-500 transition-all duration-300">
    {label}
  </label>
</div>
</>
  );
}
export default CheckBox;
