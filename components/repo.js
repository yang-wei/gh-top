var React = require('react');

var repo = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          <img className='avatar' src='https://avatars.githubusercontent.com/u/70142?v=3' />
          <strong className='reponame'>Node</strong>
          <p>evented I/O for v8 javascript</p>
          <span><i className='fa fa-star'></i>32101</span>
        </li>
        <li>
          <img className='avatar' src='https://avatars.githubusercontent.com/u/70142?v=3' />
          <strong className='reponame'>Node</strong>
          <p>evented I/O for v8 javascript</p>
          <span><i className='fa fa-star'></i>32101</span>
        </li>
        <li>
          <img className='avatar' src='https://avatars.githubusercontent.com/u/70142?v=3' />
          <strong className='reponame'>Node</strong>
          <p>evented I/O for v8 javascript</p>
          <span><i className='fa fa-star'></i>32101</span>
        </li>
      </ul> 
    )
  }
});

module.exports = repo;
