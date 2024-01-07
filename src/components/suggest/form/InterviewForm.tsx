import InterviewField from './field/InterviewField';

import useSelectInterview from './hooks/useSelectInterview';

export default function InterviewForm() {
  console.log('render InterviewForm');
  const { interviewAvailabletimes, handleClickInterviewAvailabletimes } = useSelectInterview();

  return (
    <section id="interview" tw="pt-10 pb-10 px-5">
      <InterviewField selectedList={interviewAvailabletimes} handleClick={handleClickInterviewAvailabletimes} />
    </section>
  );
}
