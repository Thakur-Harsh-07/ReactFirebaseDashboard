function StudentList({ students, filter }) {
  const filtered = filter
    ? students.filter(s =>
        s.course.toLowerCase().includes(filter.toLowerCase())
      )
    : students;

  return (
    <div>
      <h3 className="font-semibold mb-2"></h3>
      {filtered.length === 0 ? (
        <p className="text-gray-500 font-medium">No student found</p>
      ) : (
        <ul className="font-bold text-left">
          {filtered.map(s => (
            <li key={s.id}>
              {s.name} - {s.email} - {s.course}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
