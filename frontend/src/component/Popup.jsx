import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';

const Popup = ({checked,setChecked}) => {
    const [open, setOpen] = useState(false);
    // const [checked, setChecked] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        setChecked(true);
        setOpen(false);
    };
    const handledisAgree=()=>{
        setChecked(false);
        setOpen(false);
    }
    return (
        <div>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />
                <p className='secCol hover' onClick={handleClickOpen}>Accept Terms and Conditions</p>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Terms and Conditions"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>Welcome to Sport Activities Center!</b>
                        <p>By accessing our website at Sport Activities Center, you agree to these terms and conditions. If you do not agree, please do not use our site.</p>
                        <b>Cookies</b>
                        <p>We use cookies to enhance your experience. By using our site, you agree to our use of cookies.</p>
                        <b>License</b>
                        <p>All content on this site is owned by Sport Activities Center or its licensors. You may use it for personal purposes but cannot:</p>
                        <ul>
                            <li>Republish, sell, or rent our material</li>
                            <li>Reproduce or copy our material</li>
                            <li>Redistribute our content without permission</li>
                        </ul>
                        <b>User Comments</b>
                        <p>You may post comments, but you are responsible for them. Comments do not reflect our views, and we are not liable for them. We reserve the right to remove any comments we deem inappropriate.</p>
                        <b>Hyperlinking to Our Content</b>
                        <p>The following organizations may link to our website without prior written approval:</p>
                        <ul>
                            <li>Government agencies</li>
                            <li>Search engines</li>
                            <li>News organizations</li>
                            <li>Online directories</li>
                            <li>Accredited Businesses</li>
                        </ul>
                        <p>Others may link if approved. Links must not be deceptive or imply false sponsorship.</p>
                        <b>iFrames</b>
                        <p>You may not create frames around our web pages without prior approval.</p>
                        <b>Content Liability</b>
                        <p>We are not responsible for content on your website. You agree to protect and defend us against claims arising from your website.</p>
                        <b>Reservation of Rights</b>
                        <p>We reserve the right to request the removal of any link to our website. We also reserve the right to amend these terms at any time.</p>
                        <b>Removal of Links</b>
                        <p>If you find any link on our site offensive, contact us, and we may consider removing it.</p>
                        <b>Disclaimer</b>
                        <p>We provide our website "as is" without warranties. We are not liable for any loss or damage from using our site.</p>
                        <hr />
                        <p>For further information or to make a booking, please visit our website or contact our office directly.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handledisAgree}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Popup;
