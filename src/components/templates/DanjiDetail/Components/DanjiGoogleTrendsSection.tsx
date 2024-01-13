import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

function DanjiGoogleTrendsSection({ keyword }: { keyword?: string }) {
  useIsomorphicLayoutEffect(() => {
    function gtrendsQueries() {
      if (!keyword) return;

      window?.trends.embed.renderExploreWidgetTo(
        document.getElementById('googleRelatedQueryWidget'),
        'RELATED_QUERIES',
        {
          comparisonItem: [{ keyword, geo: '', time: 'today 12-m' }],
          category: 0,
          property: '',
        },
        {
          exploreQuery: 'q=%ED%97%AC%EB%A6%AC%98%EC%95%88&date=today 12-m',
          guestPath: 'https://trends.google.com:443/trends/embed/',
        },
      );
    }

    function gtrendsTimeseries() {
      if (!keyword) return;

      window?.trends.embed.renderExploreWidgetTo(
        document.getElementById('googleTimeseriesWidget'),
        'TIMESERIES',
        {
          comparisonItem: [{ keyword, geo: '', time: 'today 12-m' }],
          category: 0,
          property: '',
        },
        {
          exploreQuery: 'q=%ED%97%AC%EB%A6%AC%98%EC%95%88&date=today 12-m',
          guestPath: 'https://trends.google.com:443/trends/embed/',
        },
      );
    }

    gtrendsQueries();
    gtrendsTimeseries();
  }, [keyword]);

  return (
    <>
      <div id="googleTimeseriesWidget" />
      <div id="googleRelatedQueryWidget" />
    </>
  );
}

export default DanjiGoogleTrendsSection;
