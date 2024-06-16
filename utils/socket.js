const OnboardingService = require('../services/OnboardingService');

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

    socket.emit('onboarding_question', response);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
};

module.exports = handleSocket;
