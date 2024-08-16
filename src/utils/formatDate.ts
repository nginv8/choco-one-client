const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const year = date.getUTCFullYear();
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return {
    date: `${day} ${month}, ${year}`,
    time: `${formattedHours}:${formattedMinutes}${ampm}`,
    full: `${day} ${month}, ${year}, ${formattedHours}:${formattedMinutes}${ampm}`,
  };
};

export default formatDate;
