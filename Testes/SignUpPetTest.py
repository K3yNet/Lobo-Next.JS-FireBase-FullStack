from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.firefox.service import Service
import time
import random
from faker import Faker

# Inicializar o Faker
fake = Faker()

service_ = Service(GeckoDriverManager().install())

driver = webdriver.Firefox(service=service_)

driver.get("http://localhost:3000/")

time.sleep(1)
driver.find_element('xpath', '/html/body/div[1]/header/div/div/div/a[1]/button').click()
time.sleep(1)

# Função para gerar nome de animal de estimação
def generate_pet_name():
    names = ['Jubilão', 'Valmir', 'Jurupinga Biridin', 'Pepito Flor do norte', 'Boltz', 'Faller', 'ColdZera',
             'Simple', 'Cacerato', 'Fer', 'Phenix', 'Vini', 'Lukxs', 'Granado', 'Toddy', 'Otag', 'Roberto',
             'Mimindo', 'Brinas', 'Nanico', 'Grafos', 'Sebastião', 'Terra', 'Nina', 'Max', 'Luna', 'Thor',
             'Mel', 'Charlie', 'Lola', 'Zeus', 'Bella', 'Jack', 'Daisy', 'Rocky', 'Lucy', 'Milo', 'Sadie',
             'Cooper', 'Molly', 'Buddy', 'Coco', 'Leo', 'Roxy', 'Oscar', 'Ruby', 'Oliver', 'Lily', 'Maximus', 'Sophie', 'Charlie', 'Chloe', 'Duke', 'Mia', 'Rocky',
             'Zoe', 'Bear', 'Luna', 'Tucker', 'Layla', 'Shadow', 'Rosie', 'Maverick', 'Mila',
             'Apollo', 'Lulu', 'Diesel', 'Penelope', 'Rex', 'Stella', 'Harley', 'Cleo', 'Hunter',
             'Willow', 'Gizmo', 'Coco', 'King', 'Pepper', 'Olive', 'Thor', 'Hazel', 'Bandit',
             'Daisy', 'Jax', 'Maisy', 'Axel', 'Piper', 'Max', 'Nala', 'Zeus', 'Poppy', 'Koda']
    return random.choice(names)

# Função para gerar espécie de animal (cachorro ou gato)
def generate_pet_species():
    species = ['Cachorro', 'Gato']
    return random.choice(species)

# Função para gerar raça de cachorro
def generate_dog_breed():
    breeds = ['Labrador Retriever', 'Bulldog Francês', 'Golden Retriever', 'Poodle', 'Chihuahua',
              'Bulldog Inglês', 'Yorkshire Terrier', 'Pug', 'Rottweiler', 'Bichon Frisé',
              'Boxer', 'Dachshund', 'Husky Siberiano', 'Shih Tzu', 'Doberman', 'Border Collie',
              'Basset Hound', 'Dalmatian', 'Boston Terrier', 'Cocker Spaniel', 'Malamute do Alasca',
              'Shar-Pei', 'Pomeranian', 'Schnauzer', 'Bulldog Americano', 'Mastiff', 'Beagle',
              'Papillon', 'Setter Irlandês', 'Weimaraner', 'Staffordshire Bull Terrier']
    return random.choice(breeds)

# Função para gerar raça de gato
def generate_cat_breed():
    breeds = ['Siamês', 'Persa', 'Maine Coon', 'Ragdoll', 'Bengal',
              'British Shorthair', 'Sphynx', 'Scottish Fold', 'Burmese', 'Russian Blue',
              'Norwegian Forest Cat', 'Siamese', 'Exotic Shorthair', 'Devon Rex', 'Abyssinian',
              'American Shorthair', 'Himalayan', 'Birman', 'Tonkinese', 'Oriental',
              'Cornish Rex', 'Turkish Van', 'Manx', 'Siberian', 'Balinese', 'Egyptian Mau',
              'Toyger', 'Somali', 'Chartreux', 'Pixiebob', 'Japanese Bobtail']
    return random.choice(breeds)

driver.find_element('xpath', '//*[@id="floatingInput"]').send_keys('gdp2002@yahoo.com')
time.sleep(1)
driver.find_element('xpath', '//*[@id="floatingPassword"]').send_keys('senha12345')
time.sleep(5)
driver.find_element('xpath', '/html/body/div[1]/div/div/div/div[2]/form/button[1]').click()
time.sleep(10)
driver.get("http://localhost:3000/SignUpPet/")
time.sleep(1)

for i in range(5):
  petName = generate_pet_name()
  species = generate_pet_species()
  breedsDog = generate_dog_breed()
  breedsCat = generate_cat_breed()
  idadePet = fake.random_int(min=1, max=10)
  pesoPet = fake.random_int(min=1, max=10)

  time.sleep(1)
  driver.find_element('xpath', '//*[@id="nomePet"]').send_keys(petName)
  time.sleep(1)
  driver.find_element('xpath', '//*[@id="especiePet"]').send_keys(species)
  if(species == 'Gato'):
    driver.find_element('xpath', '//*[@id="racePet"]').send_keys(breedsCat)
  if(species == 'Cachorro'):
    driver.find_element('xpath', '//*[@id="racePet"]').send_keys(breedsDog)
  time.sleep(1)
  driver.find_element('xpath', '//*[@id="idadePet"]').send_keys(str(idadePet))
  time.sleep(1)
  driver.find_element('xpath', '//*[@id="pesoPet"]').send_keys(str(pesoPet))
  time.sleep(3)
  driver.find_element('xpath', '/html/body/div[1]/div/div/div/div[2]/form/button').click()

# Resto do seu código...

