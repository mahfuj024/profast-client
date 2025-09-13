import { useNavigate } from "react-router"
import profastLogo from "../../assets/logo.png"

function ProfastLogo() {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/")} className="flex items-center cursor-pointer">
        <img src={profastLogo} alt="logo"/>
        <h1 className="text-2xl lg:text-3xl font-bold mt-7 ml-[-12px]">Profast</h1>
    </div>
  )
}

export default ProfastLogo