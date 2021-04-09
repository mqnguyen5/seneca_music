import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {}

  registerUser = {
    userName: '',
    password: '',
    password2: '',
  };
  warning: any;
  success = false;
  loading = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (
      this.registerUser.userName &&
      this.registerUser.password === this.registerUser.password2
    ) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }
}
