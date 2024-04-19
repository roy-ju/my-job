export type InterviewScheduleInfoItem = {
  address: string;
  interview_available_times: string;
  is_quick_interview: boolean;
  interview_schedule_count: number;
};

export type HomeSuggestInfoResponse = {
  /** 전체 구해요 요청 건수 */
  suggest_sent_count: number;
  /** 추천 대기 중 */
  suggest_waiting_recommended_count: number;
  /** 추천 대기 중 */
  suggest_new_recommended_count: number;
  /** 총 추천 수 */
  suggest_total_recommended_count: number;
  /** 인터뷰 관련 */
  interview_schedule_info: InterviewScheduleInfoItem | null;
};
