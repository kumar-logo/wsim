import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class WelcomeComponent {

  services = [
    {
      title: 'Financial Advisory U.S',
      description: 'Expert guidance for U.S. market investments and portfolio management.',
      link: 'https://wallstim.com',
      icon: 'fas fa-chart-line',
      iconBg: 'bg-gradient-to-br from-pink-500 to-pink-400',
      linkColor: 'text-pink-500',
    },
    {
      title: 'Financial Advisory India',
      description: 'Comprehensive solutions for Indian markets with local expertise.',
      link: 'https://www.bharathidirect.com/',
      icon: 'fas fa-globe-asia',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-400',
      linkColor: 'text-orange-500',
    },
    {
      title: 'Macro Analysis',
      description: 'Advanced macro-economic analysis and market intelligence.',
      link: 'https://wsimusa.com',
      icon: 'fas fa-chart-bar',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-400',
      linkColor: 'text-emerald-500',
    },
    {
      title: 'Faqt Check',
      description: 'Real-time fact verification and research tools.',
      link: 'http://faqtcheck.com',
      icon: 'fas fa-check-double',
      iconBg: 'bg-gradient-to-br from-cyan-600 to-cyan-400',
      linkColor: 'text-cyan-600',
    },
  ];
}
