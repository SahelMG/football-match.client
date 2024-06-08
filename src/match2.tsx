// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import { Button, Form, Modal, Table } from 'react-bootstrap';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import matchesData from './Team.json';
// import { ChangeEventHandler } from 'react';

// type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// interface GoalData {
//     Time: number;
//     Player: string;
//     Team: string;
// }

// interface MatchData {
//     Host: string;
//     Guest: string;
//     Goals: GoalData[];
// }

// function Football() {
//     const [league, setLeague] = useState<MatchData[]>(Array.isArray(matchesData) ? matchesData : []);
//     const [show, setShow] = useState(false);
//     const [host, setHost] = useState('');
//     const [guest, setGuest] = useState('');
//     const [goals, setGoals] = useState<GoalData[]>([]);

//     const handleAdd = () => setShow(true);
//     const handleClose = () => {
//         setShow(false);
//         setHost('');
//         setGuest('');
//         setGoals([]);
//     };


//     const calculateGoals = (match: MatchData, team: string): number => {
//         return match.Goals.filter(goal => goal.Team === team).length;
//     };

//     const [editedMatchIndex, setEditedMatchIndex] = useState<number | null>(null);

//     const handleSubmit = () => {
//         const newMatch: MatchData = {
//             Host: host,
//             Guest: guest,
//             Goals: goals
//         };
//         const updatedLeague = [...league.filter((_, index) => index !== editedMatchIndex), newMatch]; 
//         setLeague(updatedLeague); 
//         handleClose();
//     };
    




//     const handleGoalTimeChange = (value: string, index: number) => {
//         const newGoals = [...goals];
//         newGoals[index].Time = parseInt(value);
//         setGoals(newGoals);
//     };

//     const handleGoalPlayerChange = (value: string, index: number) => {
//         const newGoals = [...goals];
//         newGoals[index].Player = value;
//         setGoals(newGoals);
//     };

//     const handleGoalTeamChange = (value: string, index: number) => {
//         const newGoals = [...goals];
//         newGoals[index].Team = value;
//         setGoals(newGoals);
//     };

//     const handleAddGoal = () => {
//         setGoals([...goals, { Time: 0, Player: '', Team: '' }]);
//     };

//     const handleEditGoal = (updatedGoal: GoalData, matchIndex: number, goalIndex: number) => {
//         const updatedLeague = [...league];
//         updatedLeague[matchIndex].Goals[goalIndex] = updatedGoal;
//         setLeague(updatedLeague);
//     };

//     const handleDeleteGoal = (matchIndex: number, goalIndex: number) => {
//         const updatedLeague = [...league];
//         updatedLeague[matchIndex].Goals.splice(goalIndex, 1);
//         setLeague(updatedLeague);
//     };
//     const [editedMatch, setEditedMatch] = useState<MatchData | null>(null);


//     const handleEditMatch = (matchIndex: number) => {
//         const matchToUpdate = league[matchIndex];
//         const editedMatch = {
//             Host: matchToUpdate.Host,
//             Guest: matchToUpdate.Guest,
//             Goals: [...matchToUpdate.Goals]
//         };
//         setHost(matchToUpdate.Host);
//         setGuest(matchToUpdate.Guest);
//         setGoals(matchToUpdate.Goals);
//         setEditedMatch(editedMatch); 
//         setEditedMatchIndex(matchIndex);
//         setShow(true);
//     };
    




//     return (
//         <>
//             <Button variant="primary" onClick={handleAdd}>اضافه کردن مسابقه</Button>
//             <ToastContainer />
//             {league.map((m, i) => (
//                 <div key={i} style={{ margin: "10px" }}>
//                     <h3>{m.Host} ({calculateGoals(m, m.Host)}) - {m.Guest} ({calculateGoals(m, m.Guest)})</h3>

//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th></th>
//                                 <th>زمان</th>
//                                 <th>بازیکن</th>
//                                 <th>تیم</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <Match data={m} matchIndex={i} onEditGoal={handleEditGoal} onDeleteGoal={handleDeleteGoal} host={m.Host} guest={m.Guest} />
//                         </tbody>
//                     </Table>
//                     <Button variant="info" onClick={() => handleEditMatch(i)}>ویرایش کلی</Button>
//                 </div>
//             ))}

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>اضافه کردن مسابقه</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="formHost">
//                             <Form.Label>تیم میزبان</Form.Label>
//                             <Form.Control type="text" placeholder="تیم میزبان" value={host} onChange={(e) => setHost(e.target.value)} />
//                         </Form.Group>
//                         <Form.Group controlId="formGuest">
//                             <Form.Label>تیم مهمان</Form.Label>
//                             <Form.Control type="text" placeholder="تیم مهمان" value={guest} onChange={(e) => setGuest(e.target.value)} />
//                         </Form.Group>
//                         <Form.Group controlId="formGoals">
//                             <Form.Label></Form.Label>
//                             {goals.map((goal, index) => (
//                                 <div key={index}>
//                                     <Form.Group controlId={`formTime_${index}`}>
//                                         <Form.Label>زمان گل</Form.Label>
//                                         <Form.Control type="number" placeholder="زمان" value={goal.Time} onChange={(e) => handleGoalTimeChange(e.target.value, index)} />
//                                     </Form.Group>
//                                     <Form.Group controlId={`formPlayer_${index}`}>
//                                         <Form.Label>بازیکن</Form.Label>
//                                         <Form.Control type="text" placeholder="بازیکن" value={goal.Player} onChange={(e) => handleGoalPlayerChange(e.target.value, index)} />
//                                     </Form.Group>
//                                     <Form.Group controlId={`formTeam_${index}`}>
//                                         <Form.Label>تیم</Form.Label>
//                                         <Form.Control as="select" value={goal.Team} onChange={(e) => handleGoalTeamChange(e.target.value, index)}>
//                                             <option value={host}>{host}</option>
//                                             <option value={guest}>{guest}</option>
//                                         </Form.Control>
//                                     </Form.Group>
//                                 </div>
//                             ))}
//                             <Button variant="primary" onClick={handleAddGoal} style={{ marginBottom: '10px', marginTop: '10px' }}>افزودن گل</Button>
//                         </Form.Group>

//                         <Table striped bordered hover>
//                             <thead>
//                                 <tr>
//                                     <th>زمان</th>
//                                     <th>بازیکن</th>
//                                     <th>تیم</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {goals.map((goal, index) => (
//                                     <tr key={index}>
//                                         <td>{goal.Time}</td>
//                                         <td>{goal.Player}</td>
//                                         <td>{goal.Team}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>

//                         <Button variant="primary" onClick={handleSubmit}>
//                             ذخیره
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// }

// function Match({ data, matchIndex, onEditGoal, onDeleteGoal, host, guest }: {
//     data: MatchData,
//     matchIndex: number,
//     onEditGoal: (updatedGoal: GoalData, matchIndex: number, goalIndex: number) => void,
//     onDeleteGoal: (matchIndex: number, goalIndex: number) => void,
//     host: string,
//     guest: string
// }) {
//     return (
//         <>
//             {data.Goals.map((g, i) => (
//                 <Goal key={i} data={g} onEdit={onEditGoal} onDelete={onDeleteGoal} matchIndex={matchIndex} goalIndex={i} host={host} guest={guest} />
//             ))}
//         </>
//     );
// }

// function Goal({ data, onEdit, onDelete, matchIndex, goalIndex, host, guest }: {
//     data: GoalData,
//     onEdit: (updatedGoal: GoalData, matchIndex: number, goalIndex: number) => void,
//     onDelete: (matchIndex: number, goalIndex: number) => void,
//     matchIndex: number,
//     goalIndex: number,
//     host: string,
//     guest: string
// }) {
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [editedGoal, setEditedGoal] = useState<GoalData>({ ...data });

//     const handleCloseEditModal = () => setShowEditModal(false);
//     const handleShowEditModal = () => setShowEditModal(true);

//     const handleSaveEdit = () => {
//         onEdit(editedGoal, matchIndex, goalIndex);
//         handleCloseEditModal();
//     };

//     const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEditedGoal({ ...editedGoal, Time: parseInt(e.target.value) });
//     };

//     const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEditedGoal({ ...editedGoal, Player: e.target.value });
//     };

//     const handleTeamChange: ChangeEventHandler<FormControlElement> = (e) => {
//         const value = e.target.value;
//         setEditedGoal({ ...editedGoal, Team: value });
//     };

//     return (
//         <tr>
//             <td>
//                 <Button variant="link" style={{ textDecoration: 'none', color: 'red' }} onClick={handleShowEditModal}>
//                     ویرایش
//                 </Button>
//                 <Button variant="link" style={{ textDecoration: 'none', color: 'red' }} onClick={() => onDelete(matchIndex, goalIndex)}>
//                     حذف
//                 </Button>
//                 <Modal show={showEditModal} onHide={handleCloseEditModal}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>ویرایش گل</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form>
//                             <Form.Group controlId="formTime">
//                                 <Form.Label>زمان گل</Form.Label>
//                                 <Form.Control type="number" value={editedGoal.Time.toString()} onChange={handleTimeChange} />
//                             </Form.Group>
//                             <Form.Group controlId="formPlayer">
//                                 <Form.Label>بازیکن</Form.Label>
//                                 <Form.Control type="text" value={editedGoal.Player} onChange={handlePlayerChange} />
//                             </Form.Group>
//                             <Form.Group controlId="formTeam">
//                                 <Form.Label>تیم</Form.Label>
//                                 <Form.Control as="select" value={editedGoal.Team} onChange={handleTeamChange}>
//                                     <option value={host}>{host}</option>
//                                     <option value={guest}>{guest}</option>
//                                 </Form.Control>
//                             </Form.Group>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseEditModal}>لغو</Button>
//                         <Button variant="primary" onClick={handleSaveEdit}>ذخیره</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </td>
//             <td>{data.Time}</td>
//             <td>{data.Player}</td>
//             <td>{data.Team}</td>
//         </tr>
//     );
// }

// ReactDOM.render(
//     <Football />,
//     document.getElementById('root')
// );

// export default Football;
