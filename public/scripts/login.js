$(() => {
  $("#login-btn").on("click", () => {
    const $modalBody = $("#modalBody");
    $modalBody.empty();

    const loginhtml = `
  <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#login" role="tab" aria-controls="home" aria-selected="true">Login</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#register" role="tab" aria-controls="profile" aria-selected="false">Register</a>
  </li>
  </ul>

<div class="tab-content" id="myTabContent">
  <form method="POST" action="/api/users/login" id="login" class="login tab-pane fade show active">
  <h2>Login</h2>
  <div class="form-group">
    <label for="login-email">Email address</label>
    <input
      type="email"
      class="form-control"
      placeholder="Enter Email"
      id="login-email"
      name="email"
      aria-describedby="emailHelp"
    />
  </div>
  <div class="form-group">
    <label for="login-password">Password</label>
    <input
      type="password"
      placeholder="Enter Password"
      name="password"
      class="form-control"
      id="login-password"
    />
  </div>
  <button type="submit" class="btn btn-dark">Login</button>
  </form>

  <form method="POST" action="/api/users/register" id="register" class="register tab-pane fade">
  <h2>Register</h2>
  <div class="form-group">
    <label for="register-email">Email address</label>
    <input
      type="email"
      class="form-control"
      placeholder="Enter Email"
      id="register-email"
      name="email"
      aria-describedby="emailHelp"
    />
  </div>
  <div class="form-group">
    <label for="register-password">Password</label>
    <input
      type="password"
      placeholder="Enter Password"
      name="password"
      class="form-control"
      id="register-password"
    />
  </div>
  <div class="form-group">
  <label for="phone_number">Phone number</label>
  <input
    type="text"
    class="form-control"
    placeholder="Enter phone number"
    id="phone_number"
    name="phone_number"
  />
  </div>
  <div class="form-group">
  <label for="name">Name</label>
  <input
    type="text"
    class="form-control"
    placeholder="Enter username"
    id="name"
    name="name"
  />
  </div>
  <button type="submit" class="btn btn-dark">
    Register
  </button>
</form></div>
  `;
    $modalBody.append(loginhtml);
  });
});
