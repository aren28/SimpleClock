import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// dayjsプラグインを拡張
dayjs.extend(utc);
dayjs.extend(timezone);

const SimpleClock = () => {
  const theme = useTheme();
  const [time, setTime] = useState(dayjs());
  const [initialized, setInitialized] = useState(false);

  const fetchTime = async () => {
    try {
      const guessTimezone = await dayjs.tz.guess();
      console.log('Guessed Timezone:', `${import.meta.env.VITE_API_ENDPOINT + guessTimezone}`);
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT + guessTimezone);
      const data = await response.json();
      setTime(dayjs(data.datetime).tz(`${guessTimezone}`));
    } catch (error) {
      console.error('Error fetching time:', error);
    } finally {
      setInitialized(true);
    }
  };

  // 初期時刻取得とタイマー設定
  useEffect(() => {
    // 初期時刻を取得
    fetchTime();

    const timer = setInterval(() => {
      setTime(prev => prev.add(1, 'second'));
    }, 1000);

    // 10分ごとにfetchTimeを再実行
    const fetchInterval = setInterval(() => {
      fetchTime();
    }, 10 * 60 * 1000); // 10分

    return () => {
      clearInterval(timer);
      clearInterval(fetchInterval);
    };

  }, []);

  // 針の角度を計算
  const hours = time.hour() % 12;
  const minutes = time.minute();
  const seconds = time.second();

  const hrRotation = hours * 30 + minutes * 0.5;
  const mnRotation = minutes * 6;
  const scRotation = seconds * 6;

  if (!initialized) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#000',
        color: theme.palette.common.white,
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 350,
          height: 350,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'url(https://lokeshpareek-mob.github.io/img/clock.png)',
          backgroundSize: 'cover',
          borderRadius: '50%',
          boxShadow: theme.shadows[10],
          mb: 4
        }}
      >
        {/* 時針 */}
        <Box
          sx={{
            position: 'absolute',
            width: 160,
            height: 160,
            display: 'flex',
            justifyContent: 'center',
            transform: `rotate(${hrRotation}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: 6,
              height: 80,
              backgroundColor: theme.palette.secondary.main,
              zIndex: 10,
              borderRadius: '6px 6px 0 0'
            }}
          />
        </Box>

        {/* 分針 */}
        <Box
          sx={{
            position: 'absolute',
            width: 190,
            height: 190,
            display: 'flex',
            justifyContent: 'center',
            transform: `rotate(${mnRotation}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: 4,
              height: 90,
              backgroundColor: theme.palette.common.white,
              zIndex: 11,
              borderRadius: '6px 6px 0 0'
            }}
          />
        </Box>

        {/* 秒針 */}
        <Box
          sx={{
            position: 'absolute',
            width: 230,
            height: 230,
            display: 'flex',
            justifyContent: 'center',
            transform: `rotate(${scRotation}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: 2,
              height: 150,
              backgroundColor: theme.palette.primary.main,
              zIndex: 12,
              borderRadius: '6px 6px 0 0'
            }}
          />
        </Box>

        {/* 中心点 */}
        <Box
          sx={{
            position: 'absolute',
            width: 15,
            height: 15,
            backgroundColor: theme.palette.common.white,
            borderRadius: '50%',
            zIndex: 10000
          }}
        />
      </Box>

      {/* デジタル表示 */}
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          color: theme.palette.common.white,
          fontFamily: 'monospace'
        }}
      >
        {time.format('HH:mm:ss')}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: theme.palette.grey[400] }}
      >
        {time.format('YYYY年MM月DD日 (dddd)')}
      </Typography>
    </Box>
  );
};

export default SimpleClock;