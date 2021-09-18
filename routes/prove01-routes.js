const fs = require('fs');
const users = ['user1', 'user2', 'user3'];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    // ********** HOME PAGE **********
    if (url === '/') {
        res.write('<html>');
        // Title
        res.write('<head><title>Hello, and Welcome!</title></head>');

        // Body
        res.write('<body>');
        res.write('<h1>Hello, and Welcome to my Site!</h1>');

        // Form
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="users">');
        res.write('<button type="submit">Submit</button>');
        res.write('</form>');

        // Quick Links
        res.write('<a href="/users">Quick link to view users</a>')

        // Close
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    // ********** /USERS **********
    if (url === '/users') {
        res.write('<html>');
        // Title
        res.write('<head><title>Users</title></head>');

        // Body
        res.write('<body>');
        res.write('<h1>Here are the users on this site:</h1>');

        // List of users
        res.write('<ul>');

        users.forEach(username => {
            res.write('<li>' + username + '</li>');
        });

        res.write('</ul>');

        // Back to main
        res.write('<a href="/">Back to main page</a>')

        // Close
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    
    // ********** /CREATE-USER **********
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            // Pull newUser from request
            const parsedBody = Buffer.concat(body).toString();
            const newUser = parsedBody.split('=')[1];

            // Add newUser to list of users and display in console
            console.log('New user:',newUser);
            users.push(newUser);

            // Redirect
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        })
    }
};

exports.handler = requestHandler;