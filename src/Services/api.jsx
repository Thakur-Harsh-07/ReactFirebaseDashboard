import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const instance = axios.create();
const mock = new MockAdapter(instance, { delayResponse: 1000 });

let students = [
  { id: 1, name: "Sam", email: "sam@gmail.com", course: "CS" },
  { id: 2, name: "Marry", email: "marry@gmail.com", course: "Math" },
  { id: 3, name: "Tom", email: "tom@gmail.com", course: "Ai" },
  { id: 4, name: "John", email: "john@gmail.com", course: "Bio" },
  { id: 5, name: "Rohan", email: "rohan@gmail.com", course: "Mechanical" },
  { id: 6, name: "Mohan", email: "mohan@gmail.com", course: "It" },
  { id: 7, name: "Sohan", email: "sohan@gmail.com", course: "Ece" },
  { id: 8, name: "Max", email: "max@gmail.com", course: "Electrical" },
  { id: 9, name: "Den", email: "den@gmail.com", course: "Mechanical" },
  { id: 10, name: "Monty", email: "monty@gmail.com", course: "Civil" }
  
];

mock.onGet("/students").reply(200, students);
mock.onPost("/students").reply(config => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = Date.now();
  students.push(newStudent);
  return [201, newStudent];
});


export default instance;