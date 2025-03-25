function TextField({ label, name, value, onChange ,className ,dir}) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        autoComplete="off"
        className={`textField__input ${className}`}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        dir={dir}
      />
    </div>
  );
}
export default TextField;
