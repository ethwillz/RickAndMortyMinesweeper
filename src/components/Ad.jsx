import React from 'react';

export default class Ad extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render () {
    return (
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          google-ad-client='ca-pub-5566797500264030'
          enable-page-level-ads='true' />
    );
  }
}
