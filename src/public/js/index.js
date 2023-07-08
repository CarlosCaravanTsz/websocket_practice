const socket = io();

let user = sessionStorage.getItem('user') || ''

if (!user) {
    Swal.fire({
        title: 'Auth',
        input: 'text',
        text: 'Set username',
        inputValidator: value => { return !value.trim() && 'Please write a username' },
        allowOutsideClick: false
    }).then(result => {
        user = result.value;
        username.innerHTML = user;
        sessionStorage.setItem("user", user);
        socket.emit('new', user);
    })
} else {
    username.innerHTML = user
    socket.emit('new', user)
}


// ENVIAR MENSAJES
chatbox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        const message = chatbox.value.trim();
        if (message.length > 0) {
            socket.emit('message', {
                user,
                message
            });
            chatbox.vaue = ''
        }
    }
});

// RECIBIR MENSAJES
socket.on('logs', data => {
    let messages = ' '

    data.forEach(msn => {
        messages = `<p><i>${msn.user}</i>: ${msn.message}</p>` + messages;
    });
    logs.innerHTML = messages
})



