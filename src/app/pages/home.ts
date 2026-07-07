import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from '../sections/hero';
import { Profile } from '../sections/profile';
import { Focus } from '../sections/focus';
import { Engagements } from '../sections/engagements';
import { History } from '../sections/history';
import { Skills } from '../sections/skills';
import { Learning } from '../sections/learning';
import { Background } from '../sections/background';
import { SiteProject } from '../sections/site-project';
import { BlogTeaser } from '../blog/blog-teaser';
import { About } from '../sections/about';
import { Contact } from '../sections/contact';

@Component({
  selector: 'px-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Hero,
    Profile,
    Focus,
    Engagements,
    History,
    Skills,
    Learning,
    Background,
    SiteProject,
    BlogTeaser,
    About,
    Contact,
  ],
  template: `
    <px-hero />
    <px-profile />
    <px-focus />
    <px-engagements />
    <px-history />
    <px-skills />
    <px-learning />
    <px-background />
    <px-site-project />
    <px-blog-teaser />
    <px-about />
    <px-contact />
  `,
})
export class Home {}
