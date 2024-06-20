const OnboardingService = require('../services/OnboardingService');
const CoursePlanService = require('../services/CoursePlanService');

const handleSocket = (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('ask_onboarding_question', async (payload) => {
    const { studentId, courseId, checkpointId } = payload;

    const onboardingService = new OnboardingService(studentId, courseId, checkpointId);
    const response = await onboardingService.askOnboardingQuestion();
    console.log('response', response);

    if (response.onboardingComplete) {
      const coursePlanConfig = response.coursePlanConfig;
      const coursePlanService = new CoursePlanService(studentId, courseId);
      const coursePlan = await coursePlanService.generateCoursePlan(coursePlanConfig);

      if (coursePlan.success) {
        socket.emit('onboarding_complete', { success: true, courseId, studentId });
        return;
      }
      return;
    }

    socket.emit('onboarding_question', response);
  });

  socket.on('generate_course_plan', async (payload) => {
    const { studentId, courseId, config: coursePlanConfig } = payload;

    const coursePlanService = new CoursePlanService(studentId, courseId);
    const coursePlan = await coursePlanService.generateCoursePlan(coursePlanConfig);

    console.log('coursePlan', coursePlan);
  });



  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
};

module.exports = handleSocket;
