'use client'
import Image from 'next/image'
import styles from './page.module.scss'
import { FormEvent, MouseEventHandler, useState } from 'react'

export default function Home() {
	const [account, setAccount] = useState({ username: '', token: '' })

	interface Status {
		error: boolean
		text: string
	}
	const [status, setStatus] = useState<Status>({ error: false, text: '' })

	function UserCreateForm() {
		const usernameLabel = 'create_username'
		const passwordLabel = 'create_password'

		async function handleSubmit(e: FormEvent<HTMLFormElement>) {
			e.preventDefault()
			const formData = new FormData(e.target as HTMLFormElement)
			const inputUsername = formData.get(usernameLabel) as string
			const inputPassword = formData.get(passwordLabel) as string
			/* --- client-side data validation goes here --- */

			const reqBody = { payload: { username: inputUsername, password: inputPassword } }

			const res = await fetch('/api/user/create', {
				method: 'POST',
				body: JSON.stringify(reqBody),
			})
			if (!res.ok) {
				const resBody = await res.json()
				setStatus({ error: true, text: resBody.message })
			} else {
				const resBody = await res.json()
				setStatus({ error: false, text: resBody.message })
				setAccount({ username: inputUsername, token: resBody.newToken })
			}
		}
		return (
			<form className={styles.form} onSubmit={handleSubmit}>
				<h3>Create New User</h3>
				<input id={usernameLabel} name={usernameLabel} type='text'></input>
				<label htmlFor={usernameLabel}>Username</label>
				<input id={passwordLabel} name={passwordLabel} type='text'></input>
				<label htmlFor={passwordLabel}>Password</label>
				<button type='submit'>Submit</button>
			</form>
		)
	}

	function UserLoginForm() {
		const usernameLabel = 'login_username'
		const passwordLabel = 'login_password'

		async function handleSubmit(e: FormEvent<HTMLFormElement>) {
			e.preventDefault()
			const formData = new FormData(e.target as HTMLFormElement)
			const inputUsername = formData.get(usernameLabel) as string
			const inputPassword = formData.get(passwordLabel) as string
			/* --- client-side data validation goes here --- */

			const reqBody = { payload: { username: inputUsername, password: inputPassword } }

			const res = await fetch('/api/user/login', {
				method: 'POST',
				body: JSON.stringify(reqBody),
			})
			if (!res.ok) {
				const resBody = await res.json()
				setStatus({ error: true, text: resBody.message })
			} else {
				const resBody = await res.json()
				setStatus({ error: false, text: resBody.message })
				setAccount({ username: inputUsername, token: resBody.newToken })
			}
		}
		return (
			<form className={styles.form} onSubmit={handleSubmit}>
				<h3>Login User</h3>
				<input id={usernameLabel} name={usernameLabel} type='text'></input>
				<label htmlFor={usernameLabel}>Username</label>
				<input id={passwordLabel} name={passwordLabel} type='text'></input>
				<label htmlFor={passwordLabel}>Password</label>
				<button type='submit'>Submit</button>
			</form>
		)
	}

	return (
		<main className={styles.main}>
			<div className={styles.form_group}>
				<h2>User</h2>
				<div className={styles.two_col}>
					<div className={styles.col}>
						<UserCreateForm />
					</div>
					<div className={styles.col}>
						<UserLoginForm />
					</div>
				</div>
			</div>
			<div className={styles.info}>
				<div>
					<h3>Username:</h3>
					<p>{account.username}</p>
				</div>
				<div>
					<h3>Token:</h3>
					<p>{account.token}</p>
				</div>
				<div>
					<h3>Status:</h3>
					<p className={status.error ? styles.error : styles.no_error}>{status.text}</p>
				</div>
			</div>
		</main>
	)
}
