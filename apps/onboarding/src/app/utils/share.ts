export const shareResult = async () => {
  if (!navigator.canShare) {
    window.Kakao.Share.sendScrap({
      requestUrl: document.location.href,
    });
    return;
  }
  await navigator.share({
    title: '당신의 술 마시기 레벨은?',
    text: '당신의 술 마시기 레벨은?',
    url: document.location.href,
  });
};
