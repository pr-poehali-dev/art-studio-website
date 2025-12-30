import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface ServiceDetails {
  title: string;
  age?: string;
  icon: string;
  description: string;
  duration: string;
  price: string;
  groupSize: string;
  includes: string[];
}

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: '', phone: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const kidsServices: ServiceDetails[] = [
    { 
      title: 'Рисование и лепка для малышей', 
      age: '3-6 лет', 
      icon: 'Palette',
      description: 'Развитие мелкой моторики и творческих способностей через рисование и лепку. Занятия проходят в игровой форме.',
      duration: '45 минут',
      price: '2000 ₽/занятие',
      groupSize: 'до 6 детей',
      includes: ['Все материалы', 'Фартук и нарукавники', 'Чай и печенье', 'Фото работ']
    },
    { 
      title: 'Рисование для детей и подростков', 
      age: '7+ лет', 
      icon: 'Brush',
      description: 'Изучение различных техник рисования: акварель, гуашь, пастель, акрил. Развитие художественного вкуса.',
      duration: '60 минут',
      price: '2500 ₽/занятие',
      groupSize: 'до 8 детей',
      includes: ['Все материалы', 'Холсты и бумага', 'Индивидуальный подход', 'Работы домой']
    },
    { 
      title: 'Керамика и лепка из глины', 
      age: 'все возраста', 
      icon: 'Sparkles',
      description: 'Создание уникальных керамических изделий. Обучение работе на гончарном круге, лепке и росписи.',
      duration: '90 минут',
      price: '3000 ₽/занятие',
      groupSize: 'до 6 человек',
      includes: ['Глина и инструменты', 'Обжиг изделий', 'Краски для росписи', 'Упаковка готовых работ']
    },
    { 
      title: 'Мультипликация', 
      age: '7+ лет', 
      icon: 'Film',
      description: 'Создание собственных мультфильмов от сценария до монтажа. Изучение основ анимации.',
      duration: '90 минут',
      price: '2800 ₽/занятие',
      groupSize: 'до 8 детей',
      includes: ['Оборудование', 'Материалы для съемки', 'Монтаж видео', 'Готовый мультфильм']
    },
    { 
      title: 'Бисероплетение и шитье', 
      age: '8+ лет', 
      icon: 'Scissors',
      description: 'Освоение техник рукоделия: создание украшений, игрушек, аксессуаров. Развитие усидчивости.',
      duration: '60 минут',
      price: '2200 ₽/занятие',
      groupSize: 'до 8 детей',
      includes: ['Бисер и нитки', 'Фурнитура', 'Инструменты', 'Схемы и шаблоны']
    },
    { 
      title: 'Иллюстрация в стиле анимэ', 
      age: '10+ лет', 
      icon: 'Sparkle',
      description: 'Обучение рисованию персонажей в стиле аниме и манга. От скетчей до полноцветных иллюстраций.',
      duration: '90 минут',
      price: '2700 ₽/занятие',
      groupSize: 'до 10 детей',
      includes: ['Маркеры и линеры', 'Бумага для скетчей', 'Референсы', 'Цифровые материалы']
    },
    { 
      title: 'Арт-терапия', 
      age: 'все возраста', 
      icon: 'Heart',
      description: 'Творческие практики для снятия стресса и эмоционального выражения. Работа с психологом.',
      duration: '60 минут',
      price: '3500 ₽/занятие',
      groupSize: 'до 5 человек',
      includes: ['Все материалы', 'Консультация психолога', 'Индивидуальный подход', 'Конфиденциальность']
    },
    { 
      title: 'Бумагопластика', 
      age: '6+ лет', 
      icon: 'Origami',
      description: 'Создание объемных композиций из бумаги: оригами, квиллинг, папье-маше.',
      duration: '60 минут',
      price: '2000 ₽/занятие',
      groupSize: 'до 8 детей',
      includes: ['Цветная бумага', 'Инструменты', 'Клей и материалы', 'Готовые работы']
    },
    { 
      title: 'Курс финансовой грамоты', 
      age: '10+ лет', 
      icon: 'DollarSign',
      description: 'Обучение основам финансовой грамотности через игры и творческие проекты.',
      duration: '90 минут',
      price: '2500 ₽/занятие',
      groupSize: 'до 12 детей',
      includes: ['Рабочие тетради', 'Игровые материалы', 'Сертификат', 'Методические пособия']
    },
    { 
      title: 'Мастер-классы по выходным', 
      age: 'все возраста', 
      icon: 'Star',
      description: 'Разнообразные творческие мастер-классы каждые выходные. Новая тема каждую неделю.',
      duration: '120 минут',
      price: '1500 ₽/мк',
      groupSize: 'до 15 человек',
      includes: ['Все материалы', 'Готовая работа', 'Фото процесса', 'Чай и угощения']
    },
    { 
      title: 'Творческая мастерская', 
      age: 'все возраста', 
      icon: 'Lightbulb',
      description: 'Свободное творчество с доступом ко всем материалам студии. Помощь преподавателя.',
      duration: '120 минут',
      price: '2000 ₽/сессия',
      groupSize: 'до 10 человек',
      includes: ['Доступ к материалам', 'Консультации', 'Рабочее место', 'Хранение работ']
    },
    { 
      title: 'Академический рисунок', 
      age: '12+ лет', 
      icon: 'PenTool',
      description: 'Подготовка к поступлению в художественные школы и ВУЗы. Портфолио и техника.',
      duration: '120 минут',
      price: '3500 ₽/занятие',
      groupSize: 'до 6 человек',
      includes: ['Все материалы', 'Индивидуальная программа', 'Портфолио', 'Консультации']
    },
  ];

  const adultsServices: ServiceDetails[] = [
    { 
      title: 'Свободная живопись', 
      icon: 'Paintbrush',
      description: 'Раскройте свой творческий потенциал! Рисуйте в любой технике под руководством опытного художника.',
      duration: '120 минут',
      price: '3000 ₽/занятие',
      groupSize: 'до 10 человек',
      includes: ['Все материалы', 'Холст/бумага', 'Мольберт', 'Напитки']
    },
    { 
      title: 'Академический рисунок', 
      icon: 'PenLine',
      description: 'Классическое художественное образование для взрослых. Техника, композиция, перспектива.',
      duration: '120 минут',
      price: '3500 ₽/занятие',
      groupSize: 'до 8 человек',
      includes: ['Все материалы', 'Индивидуальная программа', 'Домашние задания', 'Консультации']
    },
    { 
      title: 'Мастер-классы по выходным', 
      icon: 'Calendar',
      description: 'Тематические мастер-классы для взрослых. Новая техника или направление каждую неделю.',
      duration: '150 минут',
      price: '2500 ₽/мк',
      groupSize: 'до 15 человек',
      includes: ['Все материалы', 'Готовая работа', 'Фото', 'Вино и закуски']
    },
    { 
      title: 'Арт-вечеринки', 
      icon: 'PartyPopper',
      description: 'Творческие вечеринки для компаний друзей. Рисование в непринужденной атмосфере с вином.',
      duration: '180 минут',
      price: '2800 ₽/чел',
      groupSize: 'от 6 человек',
      includes: ['Все материалы', 'Холст 40х50', 'Напитки', 'Музыка и веселье']
    },
    { 
      title: 'Арт-свидания', 
      icon: 'Heart',
      description: 'Романтические занятия для пар. Создайте совместную картину в атмосфере уюта.',
      duration: '120 минут',
      price: '5000 ₽/пара',
      groupSize: '2 человека',
      includes: ['Все материалы', 'Два холста', 'Шампанское', 'Романтическая атмосфера']
    },
    { 
      title: 'Картины из эпоксидной смолы', 
      icon: 'Droplet',
      description: 'Создание современных интерьерных картин в технике Resin Art. Уникальные работы.',
      duration: '180 минут',
      price: '4500 ₽/занятие',
      groupSize: 'до 6 человек',
      includes: ['Эпоксидная смола', 'Пигменты', 'Основа', 'Защита работы']
    },
    { 
      title: 'Нейрографика', 
      icon: 'Network',
      description: 'Медитативная практика рисования для трансформации и самопознания.',
      duration: '120 минут',
      price: '3200 ₽/занятие',
      groupSize: 'до 8 человек',
      includes: ['Все материалы', 'Авторская методика', 'Психологическая поддержка', 'Чай']
    },
  ];

  const teachers = [
    { name: 'Анна Петрова', specialty: 'Живопись и графика', experience: '15 лет опыта' },
    { name: 'Мария Иванова', specialty: 'Керамика и лепка', experience: '10 лет опыта' },
    { name: 'Дмитрий Смирнов', specialty: 'Академический рисунок', experience: '12 лет опыта' },
  ];

  const schedule = [
    { day: 'Понедельник-Пятница', time: '10:00 - 20:00' },
    { day: 'Суббота-Воскресенье', time: '10:00 - 18:00' },
  ];

  const reviews = [
    {
      name: 'Елена Соколова',
      role: 'Мама Маши (5 лет)',
      text: 'Дочка с радостью бежит на занятия! За полгода научилась смешивать цвета, делать композиции. Преподаватели — настоящие профессионалы с детьми.',
      rating: 5
    },
    {
      name: 'Алексей Морозов',
      role: 'Участник арт-вечеринок',
      text: 'Отличное место для отдыха! Приходим с друзьями каждый месяц. Атмосфера супер, все материалы предоставляют, работы получаются красивые.',
      rating: 5
    },
    {
      name: 'Ирина Васильева',
      role: 'Ученица курса живописи',
      text: 'Всегда мечтала научиться рисовать. Здесь я наконец-то воплотила мечту! Спасибо Анне Петровне за терпение и профессионализм!',
      rating: 5
    },
    {
      name: 'Сергей и Ольга',
      role: 'Пара с арт-свидания',
      text: 'Провели незабываемый вечер! Романтично, креативно и очень весело. Наши картины теперь висят дома и напоминают об этом дне.',
      rating: 5
    },
    {
      name: 'Мария Ковалева',
      role: 'Мама Артема (14 лет)',
      text: 'Сын готовится к поступлению в художественный колледж. Курс академического рисунка дал отличную базу. Портфолио получилось сильным!',
      rating: 5
    },
    {
      name: 'Дмитрий Петров',
      role: 'Участник мастер-класса по керамике',
      text: 'Никогда не работал с глиной — был приятно удивлен! Преподаватель помог создать красивую вазу. Теперь хожу регулярно.',
      rating: 5
    },
  ];

  const openServiceModal = (service: ServiceDetails) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Palette" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Живописная
              </h1>
            </div>
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => scrollToSection('hero')}>
                    Главная
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Наши услуги</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink onClick={() => scrollToSection('kids-services')}>
                        <div className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
                          Занятия для детей
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink onClick={() => scrollToSection('adults-services')}>
                        <div className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
                          Занятия для взрослых
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => scrollToSection('about')}>
                    О студии
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => scrollToSection('schedule')}>
                    Расписание
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => scrollToSection('teachers')}>
                    Преподаватели
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => scrollToSection('gallery')}>
                    Галерея
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => scrollToSection('reviews')}>
                    Отзывы
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button onClick={() => scrollToSection('contact')} className="ml-2">
                    Связаться
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Арт-студия{' '}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    "Живописная"
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Творческое пространство для детей и взрослых. 
                  Раскройте свой потенциал в искусстве вместе с профессионалами!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => scrollToSection('contact')} className="text-lg">
                    Записаться на занятие
                    <Icon name="ArrowRight" className="ml-2" size={20} />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection('kids-services')}>
                    Наши программы
                  </Button>
                </div>
              </div>
              <div className="relative animate-scale-in">
                <img 
                  src="https://cdn.poehali.dev/projects/1e9b3fdc-1def-4ae4-a2c5-511587273cc3/files/e0b19d81-1a73-415c-b53a-e510d697cb35.jpg"
                  alt="Творческое искусство"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">О студии</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Место, где рождается творчество и развиваются таланты
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <CardTitle>Удобное расположение</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Близко к метро, удобный подъезд и бесплатная парковка для посетителей
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name="Users" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Опытные преподаватели</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Профессиональные художники с педагогическим образованием и большим опытом
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name="Sparkles" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Современное оборудование</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Все материалы и инструменты для творчества в просторных светлых классах
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="kids-services" className="py-20 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Занятия для детей</h2>
              <p className="text-xl text-muted-foreground">
                Развиваем творческие способности с раннего возраста
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {kidsServices.map((service, index) => (
                <Card 
                  key={index} 
                  onClick={() => openServiceModal(service)}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary"
                >
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name={service.icon as any} className="text-white" size={28} />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">
                      {service.age}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 rounded-3xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <Icon name="Gift" className="text-white" size={40} />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Дни Рождения и праздники</h3>
                  <p className="text-muted-foreground">
                    Организуем незабываемые творческие праздники для детей всех возрастов
                  </p>
                </div>
                <Button size="lg" onClick={() => scrollToSection('contact')}>
                  Заказать праздник
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="adults-services" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Занятия для взрослых</h2>
              <p className="text-xl text-muted-foreground">
                Творите и вдохновляйтесь в кругу единомышленников
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {adultsServices.map((service, index) => (
                <Card 
                  key={index} 
                  onClick={() => openServiceModal(service)}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name={service.icon as any} className="text-white" size={32} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-accent group-hover:text-white transition-colors">
                      Подробнее
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="py-20 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Расписание</h2>
            </div>
            
            <div className="max-w-2xl mx-auto">
              {schedule.map((item, index) => (
                <Card key={index} className="mb-4 border-2 hover:border-primary transition-colors">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon name="Clock" className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.day}</h3>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-primary">{item.time}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="teachers" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши преподаватели</h2>
              <p className="text-xl text-muted-foreground">
                Профессионалы своего дела с большим опытом
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teachers.map((teacher, index) => (
                <Card key={index} className="text-center border-2 hover:border-secondary transition-all hover:shadow-xl">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Icon name="User" className="text-white" size={40} />
                    </div>
                    <CardTitle className="text-2xl">{teacher.name}</CardTitle>
                    <CardDescription className="text-base font-medium text-primary">
                      {teacher.specialty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{teacher.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея работ</h2>
              <p className="text-xl text-muted-foreground">
                Творчество наших учеников
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">
                <img 
                  src="https://cdn.poehali.dev/projects/1e9b3fdc-1def-4ae4-a2c5-511587273cc3/files/0da1cf22-d0ae-4b83-b1f5-fd0f994915ae.jpg"
                  alt="Работы студии"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-semibold text-lg">Детская студия</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">
                <img 
                  src="https://cdn.poehali.dev/projects/1e9b3fdc-1def-4ae4-a2c5-511587273cc3/files/dd31cb6f-8d8d-4af4-a77b-71e001ad2e7f.jpg"
                  alt="Керамика"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-semibold text-lg">Керамика и лепка</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">
                <img 
                  src="https://cdn.poehali.dev/projects/1e9b3fdc-1def-4ae4-a2c5-511587273cc3/files/e0b19d81-1a73-415c-b53a-e510d697cb35.jpg"
                  alt="Живопись"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-semibold text-lg">Живопись</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы</h2>
              <p className="text-xl text-muted-foreground">
                Что говорят наши ученики и их родители
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" className="text-white" size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <CardDescription className="text-sm">{review.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-secondary fill-secondary" size={16} />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{review.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
                <p className="text-xl text-muted-foreground">
                  Запишитесь на пробное занятие или задайте вопрос
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Контактная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Адрес</h4>
                          <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                          <p className="text-sm text-primary mt-1">5 минут от метро, бесплатная парковка</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Phone" className="text-secondary" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Телефон</h4>
                          <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Mail" className="text-accent" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Email</h4>
                          <p className="text-muted-foreground">info@zhivopisnaya.ru</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Оставьте заявку</CardTitle>
                    <CardDescription>Мы свяжемся с вами в ближайшее время</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input 
                          placeholder="Ваше имя" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Input 
                          placeholder="Телефон" 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Textarea 
                          placeholder="Ваше сообщение (необязательно)" 
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Отправить заявку
                        <Icon name="Send" className="ml-2" size={18} />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon name="Palette" size={32} />
              <h3 className="text-2xl font-bold">Арт-студия "Живописная"</h3>
            </div>
            <p className="text-white/80 mb-6">Творчество без границ</p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" size="icon" className="rounded-full">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Icon name="Youtube" size={20} />
              </Button>
            </div>
            <p className="mt-8 text-white/60 text-sm">© 2024 Арт-студия "Живописная". Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <Icon name={selectedService.icon as any} className="text-white" size={32} />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedService.title}</DialogTitle>
                    {selectedService.age && (
                      <DialogDescription className="text-lg font-medium text-primary mt-1">
                        {selectedService.age}
                      </DialogDescription>
                    )}
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Описание</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedService.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Clock" className="text-primary" size={18} />
                        <h5 className="font-semibold text-sm">Продолжительность</h5>
                      </div>
                      <p className="text-muted-foreground">{selectedService.duration}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="DollarSign" className="text-secondary" size={18} />
                        <h5 className="font-semibold text-sm">Стоимость</h5>
                      </div>
                      <p className="text-muted-foreground">{selectedService.price}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Users" className="text-accent" size={18} />
                        <h5 className="font-semibold text-sm">Размер группы</h5>
                      </div>
                      <p className="text-muted-foreground">{selectedService.groupSize}</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">Что входит в занятие</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedService.includes.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" className="text-primary" size={14} />
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      setIsDialogOpen(false);
                      scrollToSection('contact');
                    }} 
                    className="w-full" 
                    size="lg"
                  >
                    Записаться на занятие
                    <Icon name="ArrowRight" className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;