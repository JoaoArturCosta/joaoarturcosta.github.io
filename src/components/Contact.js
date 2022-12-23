import { useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import contactImg from '../assets/img/contact-img.svg'
import 'animate.css'
import TrackVisibility from 'react-on-screen'
import emailjs from '@emailjs/browser'

export const Contact = () => {
	const formInitialDetails = {
		name: '',
		email: '',
		message: '',
	}
	const [formDetails, setFormDetails] = useState(formInitialDetails)
	const [buttonText, setButtonText] = useState('Send')
	const [status, setStatus] = useState({})

	const onFormUpdate = (category, value) => {
		setFormDetails({
			...formDetails,
			[category]: value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setButtonText('Sending...')
		/* let response = await fetch('http://localhost:5000/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(formDetails),
		})
		setButtonText('Send')
		let result = await response.json()
		setFormDetails(formInitialDetails)
		if (result.code == 200) {
			setStatus({ success: true, message: 'Message sent successfully' })
		} else {
			setStatus({
				success: false,
				message: 'Something went wrong, please try again later.',
			})
		} */
	}

	const apiKey = 'a88ada18c64543ada4d958e588c87317'
	const apiURL = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + apiKey
	const sendEmailValidationRequest = async (email) => {
		try {
			const response = await fetch(apiURL + '&email=' + email)
			const data = await response.json()
			console.log(data)
		} catch (error) {
			throw error
		}
	}

	const form = useRef()

	const sendEmail = (e) => {
		e.preventDefault() // prevents the page from reloading when you hit “Send”
		console.log(form.current)
		emailjs
			.sendForm(
				'service_h1ga4ho',
				'template_r5thymd',
				form.current,
				'90em8M88g4-JsK8O0'
			)
			.then(
				(result) => {
					setStatus({ success: true, message: 'Message sent successfully' })
				},
				(error) => {
					setStatus({
						success: false,
						message: 'Something went wrong, please try again later.',
					})
				}
			)
	}
	return (
		<section className='contact' id='connect'>
			<Container>
				<Row className='align-items-center'>
					<Col size={12} md={6}>
						<TrackVisibility>
							{({ isVisible }) => (
								<img
									className={
										isVisible ? 'animate__animated animate__zoomIn' : ''
									}
									src={contactImg}
									alt='Contact Us'
								/>
							)}
						</TrackVisibility>
					</Col>
					<Col size={12} md={6}>
						<TrackVisibility>
							{({ isVisible }) => (
								<div
									className={
										isVisible ? 'animate__animated animate__fadeIn' : ''
									}>
									<h2>Get In Touch</h2>
									<form ref={form} onSubmit={sendEmail}>
										<Row>
											<Col size={12} sm={6} className='px-1'>
												<input
													type='text'
													name='from_name'
													value={formDetails.name}
													placeholder='Name'
													onChange={(e) => onFormUpdate('name', e.target.value)}
												/>
											</Col>
											{/* <Col size={12} sm={6} className='px-1'>
												<input
													type='text'
													value={formDetails.lastName}
													placeholder='Last Name'
													onChange={(e) =>
														onFormUpdate('lastName', e.target.value)
													}
												/>
											</Col> */}
											<Col size={12} sm={6} className='px-1'>
												<input
													type='email'
													name='from_email'
													value={formDetails.email}
													placeholder='Email Address'
													onChange={(e) =>
														onFormUpdate('email', e.target.value)
													}
												/>
											</Col>
											{/* <Col size={12} sm={6} className='px-1'>
												<input
													type='tel'
													value={formDetails.phone}
													placeholder='Phone No.'
													onChange={(e) =>
														onFormUpdate('phone', e.target.value)
													}
												/>
											</Col> */}
											<Col size={12} className='px-1'>
												<textarea
													rows='6'
													value={formDetails.message}
													name='message'
													placeholder='Message'
													onChange={(e) =>
														onFormUpdate('message', e.target.value)
													}></textarea>
												<button type='submit'>
													<span>{buttonText}</span>
												</button>
											</Col>
											{status.message && (
												<Col>
													<p
														className={
															status.success === false ? 'danger' : 'success'
														}>
														{status.message}
													</p>
												</Col>
											)}
										</Row>
									</form>
								</div>
							)}
						</TrackVisibility>
					</Col>
				</Row>
			</Container>
		</section>
	)
}
