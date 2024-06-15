const {Student} = require("../../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class StudentService {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.student = null;
  }

  async createStudent({ firstName, lastName, provider }) {
    try {
      console.log("Creating student: ", firstName, lastName);
      const payload = {};
      if (firstName || lastName) {
        payload.first_name = firstName;
        payload.last_name = lastName;
      }
      if (provider) {
        payload.sign_in_provider = provider;
      }
      if (this.password) {
        payload.password = await bcrypt.hash(this.password, 10);
      }

      const [student] = await Student.findOrCreate({
        where: { email: this.email },
        defaults: payload,
      });

      console.log("Created student: ", student.id);
      this.student = student;
      return student;
    } catch (error) {
      console.log("Error creating student: ", error);
    }
  }

  async findStudentById(id) {
    return await Student.findOne({
      where: { id },
      order: [["createdAt", "ASC"]],
    });
  }

  async findStudentByEmail(email) {
    return await Student.findOne({ where: { email } });
  }

  async updateStudent(id, updates) {
    return await this.findStudentById(id).update(updates);
  }

  serializeUser(user, done) {
    done(null, user.id);
  };

  deserializeUser(id, done) {
    Student.findByPk(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error, null);
    });
  }

  async createToken(student) {
    const payload = {
      id: student.id,
      email: student.email,
    };
    return jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
  }
}

module.exports = StudentService;
