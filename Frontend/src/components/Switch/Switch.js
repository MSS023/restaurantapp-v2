import "./Switch.css";

export default function Switch(props) {
    const { checked, setChecked } = props

    return <label className="switch">
        <input type="checkbox" checked={checked} onChange={(e) => {
            setChecked(e.target.checked);
        }} />
        <span className="slider round"></span>
    </label>
}