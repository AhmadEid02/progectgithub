import React from 'react'

const AdminBookCard = ({ book, open, handleExpand, id }) => {
    return (
        <div key={id}>
            <div className='books-row-0'>
                <div className="books-row-1">
                    <p>{book.fieldName}</p>
                    <p>{book.bookedDate.split("T")[0]}</p>
                    <p>{book.bookedTime}</p>
                    <span className={`material-symbols-outlined ${open ? "active2" : ""}`} onClick={() => handleExpand()}>
                        keyboard_arrow_down
                    </span>
                </div>
                {open && (
                    <>
                        <div className="books-row-2">
                            <p>UserEmail: {book.userEmail}</p>
                            <p>bookedDuration: {book.bookedDuration} min</p>
                        </div>
                        <div className="books-row-2">
                            <div className='books-row-3'>
                                <span className="material-symbols-outlined">sports_tennis</span>
                                <p>equipment:</p>
                            </div>

                            {book.equipment.length == 0 && <p>The user didn't rent equipment</p>}
                        </div>
                        {book.equipment.length != 0 &&
                            book.equipment.map((eq, id) => {
                                return (<div className="books-row-2" key={id}>
                                    <p>equipment name: <span className='secCol'>{eq.equipmentType}</span></p>
                                    <p>equipment Price: <span className='secCol'>{eq.equipmentPrice}$</span></p>
                                </div>)
                            })
                        }
                        <div className="books-row-2">
                            <div className="books-row-3">
                                <span className="material-symbols-outlined">sports</span>
                                <p>Referee:</p>
                            </div>
                            {!book.referee.refereeName && <p>The user didn't choose referee</p>}
                        </div>

                        {
                            book.referee.refereeName &&
                            <div className="books-row-2">
                                <p>Referee Name: <span className='secCol'>{book.referee.refereeName}</span></p>
                                <p>Referee Cost: <span className='secCol'>{book.referee.refereeCost}$</span></p>
                            </div>}
                    </>
                )}
            </div>
        </div>

    )
}

export default AdminBookCard