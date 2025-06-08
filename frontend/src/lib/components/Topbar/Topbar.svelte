<style>
  .topbar {
    background-color: #f8f9fa;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .links {
    display: flex;
    gap: 15px;
  }
  
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 15px;
  }
  
  .nav-item a {
    text-decoration: none;
    color: #000;
    background-color: #e2e6ea;
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    transition: background 0.2s;
    cursor: pointer;
    font-weight: 500;
    display: inline-block;
  }

  .nav-item a:hover {
    background-color: #d1d5da;
    color: #222;
  }
</style>

<div class="topbar">
  <header class="inner">
    <nav class="links">
      <ul class="nav-list">
        <li class="nav-item"><a href="/">Containers</a></li>
      </ul>
    </nav>
  </header>
</div>
