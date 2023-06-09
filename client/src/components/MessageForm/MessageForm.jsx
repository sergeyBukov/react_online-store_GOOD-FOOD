import {useContext, useState} from "react";
import "./MessageForm.scss";
import "./MessageForm.medi.scss";
import {AuthContext} from "../../context/UserContext";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

const MessageForm = (props) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [mail, setMail] = useState(user?.email)
    const [fullName, setName] = useState(user?.displayName)

    const [message, setMessage] = useState('')
    const [mailValid, setMailValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const [mailError, setEmailError] = useState('Email не может быть пустым')
    const [nameError, setNameError] = useState('Имя не может быть пустым')

    const dopname = props.dopname ? props.dopname : ''
    const handleClose = () => props.setOpen(false)

    // function handleSubmit(event) {
    //   event.preventDefault()
    // }
    //START of getForm
    function getForm(event) {
        event.preventDefault()
        let body = {
            data: {
                fullName,
                mail,
                message,
            },
        }
        fetch(`${process.env.REACT_APP_API_URL}/forms`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response)
                    navigate('/success')
                    props.setOpen(false)
                } else {
                    console.log(response.status, 'Form not Posted')
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

//END of getForm
    const emailHandler = (e) => {
        setMail(e.target.value)
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Email должен содержать @domen.ru')
        } else {
            setEmailError('')
        }
    }

    // Валидация поле name
    const nameHandler = (e) => {
        setName(e.target.value)
        if (!e.target.value) {
            setNameError('Имя не может быть пустым')
        } else {
            setNameError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'mail':
                setMailValid(true)
                break;
            case 'fullName':
                setNameValid(true)
                break;
            default:
        }
    }

    // Валидация поле
    const messageHandler = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div>
            <form onSubmit={getForm}>
                <div className={dopname + 'formblock'}>
                    <div className={dopname + 'formblock_padding'}>
                        <h4 className={dopname + 'heading-mini heading-mini_form'}>
                            Send us message
                        </h4>

                        <div className={dopname + 'nametextbox'}>Full name</div>
                        {nameValid && nameError && (
                            <div style={{color: 'red'}}>{nameError}</div>
                        )}
                        <input
                            className={dopname + 'textbox'}
                            name='fullName'
                            type='text'
                            placeholder='Your Name'
                            value={fullName}
                            onBlur={(e) => blurHandler(e)}
                            onChange={(e) => nameHandler(e)}
                        />

                        <div className={dopname + 'nametextbox'}>Email</div>
                        {mailValid && mailError && (
                            <div style={{color: 'red'}}>{mailError}</div>
                        )}
                        <input
                            className={dopname + 'textbox'}
                            name='mail'
                            type='email'
                            placeholder='Your Email'
                            value={mail}
                            onBlur={(e) => blurHandler(e)}
                            onChange={(e) => emailHandler(e)}
                        />

                        <div className={dopname + 'nametextbox'}>Message</div>
                        <textarea
                            className={dopname + 'textbox ' + dopname + 'textbox_textarea'}
                            name='message'
                            cols='30'
                            rows='10'
                            placeholder='Your Message'
                            value={message}
                            onChange={(e) => messageHandler(e)}
                        ></textarea>

                        {dopname === 'support_' ? (
                            <div className='modal_buttons_box'>
                                <button type='submit' className='button modal_button'>
                                    SUBMIT
                                </button>
                                <Button
                                    text='CANCEL'
                                    classname='modal_button'
                                    onClick={handleClose}
                                ></Button>
                            </div>
                        ) : (
                            <div className={dopname + 'contacts_button'}>
                                <button type='submit' className={dopname + 'button'}>
                                    SUBMIT
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}
export default MessageForm
