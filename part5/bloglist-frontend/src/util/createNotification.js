export default setMessageCallBack => message => {
    setMessageCallBack(message)
    setTimeout(() => setMessageCallBack(null), 5000)
}