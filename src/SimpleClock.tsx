import { useState, useEffect } from 'react';
import { Box, Typography, Skeleton, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import type { Timer, FetchInterval } from './type/type';

// localeのimport
import 'dayjs/locale/ja';
import 'dayjs/locale/en';

// dayjsプラグインを拡張
dayjs.extend(utc);
dayjs.extend(timezone);

// 言語を自動判定してセット
const supportedLocales = ['en', 'ja']; // 必要な言語を追加
const browserLang = navigator.language.toLowerCase();
const matchedLocale =
  supportedLocales.find((locale) => browserLang.startsWith(locale)) || 'en';
dayjs.locale(matchedLocale);

// グローバルでタイマーIDを管理
let timer: Timer;
let fetchInterval: FetchInterval;

const SimpleClock = () => {
  const theme = useTheme();
  const [time, setTime] = useState(dayjs());
  const [initialized, setInitialized] = useState(false);
  const [showAnalog, setShowAnalog] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchTime = async () => {
    try {
      const guessTimezone = await dayjs.tz.guess();
      const response = dayjs();
      setTime(response.tz(guessTimezone));
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

    // すでにタイマーが動いていなければセット
    if (!timer) {
      timer = setInterval(() => {
        setTime((prev) => prev.add(1, 'second'));
      }, 1000);
    }

    if (!fetchInterval) {
      fetchInterval = setInterval(() => {
        fetchTime();
      }, 60 * 1000);
    }
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          position: 'relative',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'gray',
            opacity: 0.8,
          },
        }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            width: { xs: '50vw', sm: '70%' },
            height: { xs: 40, sm: 50 },
            mb: 2,
          }}
        />
        <Skeleton
          animation="wave"
          sx={{
            width: { xs: '30vw', sm: '40%' },
            height: { xs: 20, sm: 35 },
          }}
        />
      </Box>
    );
  }

  // URLのクエリ文字列を取得
  const queryString = window.location.search;

  // URLSearchParamsオブジェクトを作成して、クエリパラメータを解析
  const urlParams = new URLSearchParams(queryString);

  // デバッグモードの判定
  const isDebugMode = queryString.includes('?=debug');

  if (isDebugMode) {
    console.log('debug mode');
    // 他のデバッグ情報もここに出力
    console.log({
      scRotation: scRotation,
      urlParams: urlParams.toString(),
      browserLang: browserLang,
    });
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
        position: 'relative',
      }}
    >
      {showAnalog ? (
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
            mb: 4,
          }}
          onClick={() => setShowAnalog((prev) => !prev)}
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
              transition: 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 6,
                height: 80,
                backgroundColor: theme.palette.secondary.main,
                zIndex: 10,
                borderRadius: '6px 6px 0 0',
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
              transition: 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 4,
                height: 90,
                backgroundColor: theme.palette.common.white,
                zIndex: 11,
                borderRadius: '6px 6px 0 0',
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
              transition:
                scRotation === 0
                  ? 'none'
                  : 'transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 2,
                height: 150,
                backgroundColor: theme.palette.primary.main,
                zIndex: 12,
                borderRadius: '6px 6px 0 0',
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
              zIndex: 10000,
            }}
          />
        </Box>
      ) : (
        <>
          {/* デジタル表示 */}
          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            sx={{
              mt: 2,
              color: theme.palette.common.white,
              fontFamily: 'monospace',
            }}
            onClick={() => setShowAnalog((prev) => !prev)}
          >
            {time.format('HH:mm:ss')}
          </Typography>
          <Typography
            variant={isMobile ? 'subtitle1' : 'h5'}
            sx={{ color: theme.palette.grey[400] }}
          >
            {time.format('YYYY/MM/DD/ (dddd)')}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SimpleClock;
