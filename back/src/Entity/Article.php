<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  private $id;

  #[ORM\Column(type: 'string', length: 255)]
  private $name;

  #[ORM\Column(type: 'integer')]
  private $price;

  #[ORM\Column(type: 'string', length: 255)]
  private $description;

  #[ORM\Column(type: 'string', length: 255)]
  private $feature;

  #[ORM\Column(type: 'string', length: 255)]
  private $image;

  #[ORM\Column(type: 'integer')]
  private $view_count;

  #[ORM\Column(type: 'integer')]
  private $quantity;

  #[ORM\Column(type: 'string')]
  private $category_id;

  #[ORM\Column(type: 'integer')]
  private $recommendation;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $street;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $city;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $state;

  #[ORM\Column(type: 'integer', nullable: true)]
  private $zip;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $phone;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $length;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $width;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $height;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $weight;

  #[ORM\Column(type: 'integer', nullable: true)]
  private $new_release;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $reduction;
  
  public function getId(): ?int {
    return $this->id;
  }

  public function getName(): ?string {
    return $this->name;
  }
  public function setName(string $name): self {
    $this->name = $name;
    return $this;
  }

  public function getPrice(): ?int {
    return $this->price;
  }
  public function setPrice(int $price): self {
    $this->price = $price;
    return $this;
  }

  public function getDescription(): ?string {
    return $this->description;
  }
  public function setDescription(string $description): self {
    $this->description = $description;
    return $this;
  }

  public function getFeature(): ?string {
    return $this->feature;
  }
  public function setFeature(string $feature): self {
    $this->feature = $feature;
    return $this;
  }

  public function getImage(): ?string {
    return $this->image;
  }

  public function setImage(string $image): self {
    $this->image = $image;
    return $this;
  }

  public function getViewCount(): ?int
  {
      return $this->view_count;
  }

  public function setViewCount(int $view_count): self
  {
      $this->view_count = $view_count;

      return $this;
  }

  public function getQuantity(): ?int
  {
      return $this->quantity;
  }

  public function setQuantity(int $quantity): self
  {
      $this->quantity = $quantity;

      return $this;
  }

  public function getCategoryId(): ?int
  {
      return $this->category_id;
  }

  public function setCategoryId(int $category_id): self
  {
      $this->category_id = $category_id;

      return $this;
  }

  public function getRecommendation(): ?int
  {
      return $this->recommendation;
  }

  public function setRecommendation(int $recommendation): self
  {
      $this->recommendation = $recommendation;

      return $this;
  }

  public function getStreet(): ?string
  {
      return $this->street;
  }

  public function setStreet(?string $street): self
  {
      $this->street = $street;

      return $this;
  }

  public function getCity(): ?string
  {
      return $this->city;
  }

  public function setCity(?string $city): self
  {
      $this->city = $city;

      return $this;
  }

  public function getState(): ?string
  {
      return $this->state;
  }

  public function setState(?string $state): self
  {
      $this->state = $state;

      return $this;
  }

  public function getZip(): ?int
  {
      return $this->zip;
  }

  public function setZip(?int $zip): self
  {
      $this->zip = $zip;

      return $this;
  }

  public function getPhone(): ?string
  {
      return $this->phone;
  }

  public function setPhone(?string $phone): self
  {
      $this->phone = $phone;

      return $this;
  }

  public function getLength(): ?string
  {
      return $this->length;
  }

  public function setLength(?string $length): self
  {
      $this->length = $length;

      return $this;
  }

  public function getWidth(): ?string
  {
      return $this->width;
  }

  public function setWidth(?string $width): self
  {
      $this->width = $width;

      return $this;
  }

  public function getHeight(): ?string
  {
      return $this->height;
  }

  public function setHeight(?string $height): self
  {
      $this->height = $height;

      return $this;
  }

  public function getWeight(): ?string
  {
      return $this->weight;
  }

  public function setWeight(?string $weight): self
  {
      $this->weight = $weight;

      return $this;
  }

  public function getNewRelease(): ?int
  {
      return $this->new_release;
  }

  public function setNewRelease(?int $new_release): self
  {
      $this->new_release = $new_release;

      return $this;
  }

  public function getReduction(): ?string
  {
      return $this->reduction;
  }

  public function setReduction(?string $reduction): self
  {
      $this->reduction = $reduction;

      return $this;
  }


}

