import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { SnowFlakeComponent } from './snow-flake/snow-flake.component';

interface SnowFlakeConfig {
  depth: number;
  left: number;
  speed: number;
}

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [CommonModule, SnowFlakeComponent], // Import CommonModule and SnowFlakeComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public snowFlakes: SnowFlakeConfig[];

  public windX: number = 0; 
  public windY: number = 0; 

  constructor() {
    this.snowFlakes = [];

    for (let i = 1; i <= 500; i++) {
      this.snowFlakes.push({
        depth: this.randRange(1, 5),
        left: this.randRange(0, 100),
        speed: this.randRange(100, 500),
      });
    }
  }

  private randRange(min: number, max: number): number {
    const range = max - min;
    return min + Math.round(Math.random() * range);
  }

   @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const { innerWidth, innerHeight } = window;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Normalizează poziția mouse-ului la intervalul [-1, 1]
    this.windX = (mouseX - innerWidth / 2) / (innerWidth / 2);
    this.windY = (mouseY - innerHeight / 2) / (innerHeight / 2);

    // Limitează valorile pentru a evita animații extreme
    this.windX = Math.max(-1, Math.min(1, this.windX));
    this.windY = Math.max(-1, Math.min(1, this.windY));
  }
}
