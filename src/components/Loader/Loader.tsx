import './Loader.css'

export default function Loader({ message }:{ message: string}) {
  return (
    <span className="loader-wrapper">
      <div className="loader"></div>
      <p className="loading-message">{message}</p>
    </span>
  )
}
