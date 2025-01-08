import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for Angular directives like *ngIf, *ngFor, etc.

@Component({
  selector: 'app-snow-flake',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Include required modules
  templateUrl: './snow-flake.component.html',
  styleUrls: ['./snow-flake.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnowFlakeComponent implements OnChanges {
  @Input() depth!: number; 
  @Input() speed!: number; 
  @Input() speedFactor!: number; // Factor de viteză transmis din AppComponent
  @Input() left!: number;
  @Input() windX!: number; // Direcția orizontală a vântului
  @Input() windY!: number; // Direcția verticală a vântului (opțional)
  @Input() style!: any; // pentru [style.left.%]

  public flakeOpacity!: number;
  public flakeSize!: number;
  public horizontalDuration!: number;
  public horizontalDelay!: number;
  public verticalDelay!: number;
  public verticalDuration!: number;
  public swayAmplitude!: number;

  constructor() {
    this.initializeDefaults();
  }

  private initializeDefaults(): void {
    this.depth = 1;
    this.speed = 1;

    this.flakeOpacity = 1;
    this.flakeSize = 5;
    this.verticalDuration = 5;
    this.verticalDelay = 0;
    this.horizontalDuration = 3;
    this.horizontalDelay = 0;
    this.swayAmplitude = 20; 
  }

  public ngOnChanges(): void {
    // Update based on depth and speed
    this.updateFlakeProperties();
  }

  private updateFlakeProperties(): void {
    
    const baseVerticalDuration = 50;
    const baseHorizontalDuration = 30;
  
    
    this.verticalDuration = baseVerticalDuration / (this.speed * 0.2) + Math.pow(this.speed,0.2) + this.depth * 0.4;
    this.horizontalDuration = baseHorizontalDuration / (this.speed * 0.3) + Math.pow(this.speed, 0.2) + Math.sin(this.depth) * 1.2;
  
    
    this.swayAmplitude = 10 + 15 * Math.sin((this.speed + this.depth) * Math.PI / 3) * this.windX;
  
 
    this.verticalDelay = -Math.random() * this.verticalDuration;
    this.horizontalDelay = -Math.random() * this.horizontalDuration;
  
   
    this.flakeSize = 2 + this.depth * 1.5 + Math.random() * 2;

    this.flakeOpacity = Math.max(0.2, 1 - (this.depth * 0.2) + Math.random() * 0.1);
  }
  
  
}
