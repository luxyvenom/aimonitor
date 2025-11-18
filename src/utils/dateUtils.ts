/**
 * 날짜/시간 관련 유틸리티 함수
 * 프로젝트 전반에서 사용되는 날짜/시간 포맷팅 함수들을 정의합니다.
 */

/**
 * 상대 시간 포맷팅 (예: "3분 전", "2시간 전", "1일 전")
 */
export const formatDateTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  } else if (diffHours > 0) {
    return `${diffHours}시간 전`;
  } else {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return diffMins > 0 ? `${diffMins}분 전` : "방금 전";
  }
};

/**
 * 날짜 포맷팅 (예: "2024-01-15")
 */
export const formatDate = (date: Date, locale: string = "ko-KR"): string => {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/**
 * 시간 포맷팅 (예: "14:30")
 */
export const formatTime = (date: Date, locale: string = "ko-KR"): string => {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * 날짜와 시간 포맷팅 (예: "2024-01-15 14:30")
 */
export const formatDateAndTime = (date: Date, locale: string = "ko-KR"): string => {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
};

