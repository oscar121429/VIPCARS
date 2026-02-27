
import { Button } from 'react-bootstrap'
import "./ModalVerifyEmail.css"

type ModalVerifyEmailProps = {
  onClose: () => void;
};
export const ModalVerifyEmail = ({onClose}:ModalVerifyEmailProps) => {
  return (
    <section className="verifyEmailModal">
      <div className="verifyEmailGridModal">
        <div className="verifyEmailCardModal">
          <img src="/images/Register/tick.png" alt="tick" />
          <h3>¡Registro completado!</h3>
          <p>
            Hemos enviado un correo de verificación a tu dirección de email. Por
            favor, revisa tu bandeja de entrada y haz clic en el enlace de
            verificación para activar tu cuenta. Una vez verificada, podrás
            iniciar sesión normalmente.
          </p>
          <Button className="close" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </section>
  )
}
