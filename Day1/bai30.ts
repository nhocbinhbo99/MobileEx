class Student {
    name: string;
    grade: number;
    constructor(name: string, grade: number) {
      this.name = name;
      this.grade = grade;
    }
    displayInfo(): void {
      console.log(`Student: ${this.name}, Grade: ${this.grade}`);
    }
  }
  class Teacher {
    name: string;
    subject: string;
  
    constructor(name: string, subject: string) {
      this.name = name;
      this.subject = subject;
    }
    displayInfo(): void {
      console.log(`Teacher: ${this.name}, Subject: ${this.subject}`);
    }
  }
  class School {
    students: Student[] = [];
    teachers: Teacher[] = [];
    addStudent(student: Student): void {
      this.students.push(student);
    }
    addTeacher(teacher: Teacher): void {
      this.teachers.push(teacher);
    }
    displayInfo(): void {
      console.log("--- Students ---");
      this.students.forEach((student: Student): void => {
        student.displayInfo();
      });
      console.log("--- Teachers ---");
      this.teachers.forEach((teacher: Teacher): void => {
        teacher.displayInfo();
      });
    }
  }
  const school = new School();
  school.addStudent(new Student("Thanh", 9));
  school.addStudent(new Student("An", 8));
  school.addTeacher(new Teacher("Mr. Hai", "TypeScript"));

  school.displayInfo();
  export {};