import fs from "fs";
import chalk from "chalk";

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.yellow.inverse("Note title already exists"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => {
    return note.title !== title;
  });

  if (newNotes.length !== notes.length) {
    saveNotes(newNotes);
    console.log(chalk.green.inverse("Note: " + title + ", has been deleted"));
  } else {
    console.log(chalk.red.inverse("Note: " + title + ", does not exist"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  var count = 1;
  console.log(chalk.green.inverse("Your notes:"));
  const notesList = notes.forEach((note) => {
    console.log(count + ". " + note.title);
    count++;
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => {
    return note.title === title;
  });

  if (foundNote) {
    console.log(chalk.green.inverse("Title: " + foundNote.title));
    console.log(chalk.green.inverse("Body: " + foundNote.body));
  } else {
    console.log(chalk.yellow.inverse("Note does not exist"));
  }
};

export { addNote, removeNote, listNotes, readNote };
