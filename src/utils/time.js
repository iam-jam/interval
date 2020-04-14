import moment from 'moment';

export const formatTimer = (seconds) => {
  return moment().startOf('day')
    .seconds(seconds)
    .format('mm:ss');
}