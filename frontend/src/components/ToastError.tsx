import { FC } from 'react'

interface ToastErrorProps {
  error: {
    message: string
    invalidRows?: any[]
    errors?: any[]
  }
}

const ToastError: FC<ToastErrorProps> = ({error}) => {
  return (
    <div>
      <strong>There was an error! </strong>
      <p>{error.message}</p>
      { error.invalidRows &&
        <ul className="list-disc list-inside">
          { error.invalidRows.map((err:any, idx: number) => (
            <li key={idx}>
              Row {err.rowError} - {err.error}
            </li>
          )) }
        </ul>
      }
      { error.errors &&
        <ul className="list-disc list-inside">
          { error.errors.map((err:any, idx: number) => (
            <li key={idx}>{err.message}</li>
          )) }
        </ul>
      }
    </div>
  )
}

export default ToastError