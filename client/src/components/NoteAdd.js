import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck,faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const ColorButton = styled.button`
  padding: 10px;
  border-radius: 50%;
  background-color: white;
  border: none;
  margin-bottom: 10px;
`;

const ColorList = styled.ul`
 z-index : 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const AddNote = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ColorItem = styled.li`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const ContentNote = styled.div`
  position: relative;
  padding: 10px;
  width: 250px;
  height: 250px;
  border-radius: 15px;
  margin: 10px;
  background-color: transparent;
  border: 2px solid ${({ borderColor }) => borderColor || 'white'};
`;

const ContentInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size : 1.5rem ;
  height: 100%;
  width: 100%;
  color: ${({ fontColor }) => fontColor || 'white'};
`;

const Check = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: transparent;
  cursor: pointer;
  color: ${({ fontColor }) => fontColor || 'white'};
`;
const Delete = styled.div`
position: absolute;
bottom: 10px;
left: 10px;
background-color: transparent;
cursor: pointer;
color: ${({ fontColor }) => fontColor || 'white'};
`;
const NoteAdd = (props) => {
  const data = props.notes;
  
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState('');
  const [notes, setNotes] = useState(data);
  const [content, setContent] = useState('');
  const [contentNote , setContentNote] = useState('')
  const colors = ['pink', 'yellow', 'lightgrey', 'cyan', 'purple'];

  

  const AddNewNote = (color) => {
    const newNote = {
      content,
      color: color,
    };
    setNotes([...notes, newNote]);
  };

  const save =async () => {
    console.log('saved');
    setContent(contentNote);
    console.log(contentNote)
   await axios.post('http://localhost:3030/notes',{content : contentNote , color : selectedColor } )
    .then((response) => {
      console.log('Note added successfully:', response.data);
      // Handle any success actions here
    })
    .catch((error) => {
      console.error('Error adding note:', error);
      // Handle any error actions here
    });
    setContent('');
          window.location.href ='/'

  };
 

  const deleteNote = async ( index , id) => {
    console.log('id :' , id)
    try {
      await axios.delete(`http://localhost:3030/notes/${id}`);
      window.location.href = '/'
      const updatedNotes = [...notes];
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
      
    }
  };
  
  
  const handleColorClick = (color) => {
    setSelectedColor(color);
    setContent(' ');
    AddNewNote(color);
  };
  return (
    <> 
      <Navbar />
      <AddNote>
        <ColorButton onClick={() => setSelectedColor(selectedColor ? '' : 'show')}>
          <FontAwesomeIcon icon={faPlus} className='fa' />
        </ColorButton>
        {selectedColor === 'show' && (
          <ColorList>
            {colors.map((color) => (
              <ColorItem
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </ColorList>
        )}
      </AddNote>
{/*       
      {data ? data.reverse().map((note, index) => (
        <ContentNote key={index} borderColor={note.color}>
            <ContentInput
            type='text'
            placeholder='Content'
            value={note.content}
            fontColor={note.color}
            onChange={(e) => {
              const updatedNotes = [...data];
              updatedNotes[index].content = e.target.value;
              setNotes(updatedNotes.reverse()); // Assuming you have a setNotes function in props to update the notes in the parent component
            }}
          />
          <Check onClick={save}>
            <FontAwesomeIcon icon={faCheck} />
          </Check>
          <Delete onClick={()=>deleteNote(index,note.id)}>
            <FontAwesomeIcon icon={faXmark} />
          </Delete>
        </ContentNote>
      )) : ' '} */}
      {notes.reverse().map((note, index) => (
        <ContentNote key={index} borderColor={note.color}>
          <ContentInput
            type='text'
            placeholder='Content'
            value={note.content}
            fontColor={note.color}
            onChange={(e) => {
              const updatedNotes = [...notes];
              setContentNote(e.target.value);
              updatedNotes[index].content =e.target.value ;
              setNotes(updatedNotes);
            }}
          />
          <Check onClick={save}>
            <FontAwesomeIcon icon={faCheck} />
          </Check>
          <Delete onClick={() => deleteNote(index, note.id)}>
          <FontAwesomeIcon icon={faXmark} />
          </Delete>
        </ContentNote>
      ))}
    </>
  );
};

export default NoteAdd;

