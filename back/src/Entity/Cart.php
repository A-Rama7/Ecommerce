<?php

namespace App\Entity;

use App\Repository\CartRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartRepository::class)]
class Cart
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  private $id;

  #[ORM\Column(type: 'integer')]
  private $user_id;

  #[ORM\Column(type: 'integer')]
  private $article_id;

  #[ORM\Column(type: 'string', length: 255, nullable: true)]
  private $service;

  #[ORM\Column(length: 255, nullable: true)]
  private ?string $total = null;

  #[ORM\Column(length: 255, nullable: true)]
  private ?string $quantity = null;

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getUserId(): ?int
  {
    return $this->user_id;
  }

  public function setUserId(int $user_id): self
  {
    $this->user_id = $user_id;

    return $this;
  }

  public function getArticleId(): ?int
  {
    return $this->article_id;
  }

  public function setArticleId(int $article_id): self
  {
    $this->article_id = $article_id;

    return $this;
  }

  public function getService(): ?string
  {
      return $this->service;
  }

  public function setService(?string $service): self
  {
      $this->service = $service;

      return $this;
  }

  public function getQuantity(): ?string
  {
      return $this->quantity;
  }

  public function setQuantity(?string $quantity): self
  {
      $this->quantity = $quantity;

      return $this;
  }


}
