import Alert from 'react-bootstrap/Alert'

const Message = ({ balance }) => {
    return (
      <div>
      <Alert variant="info"> Your ALI API Tokens Balance is: {balance}</Alert>
      </div>
  )
}

export default Message
