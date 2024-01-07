import InterviewField from './field/InterviewField';

import useSelectInterview from './hooks/useSelectInterview';

import forms from './constants/forms';

export default function InterviewForm() {
  const { interviewAvailabletimes, handleClickInterviewAvailabletimes } = useSelectInterview();

  return (
    <section id={forms.INTERVIEW} tw="pt-10 pb-10 px-5">
      <InterviewField selectedList={interviewAvailabletimes} handleClick={handleClickInterviewAvailabletimes} />
    </section>
  );
}
