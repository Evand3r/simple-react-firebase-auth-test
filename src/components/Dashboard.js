import { Alert, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Dashboard() {
    const [error, setError] = useState('');
    const { currentUser, logOut } = useAuth();
    const history = useHistory();

    function handleLogOut() {
        setError('');

        logOut()
            .then(() => history.pushState('/login'))
            .catch(setError)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error.message}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogOut}>
                    Log Out
            </Button>
            </div>
        </>
    )
}
