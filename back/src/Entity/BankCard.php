<?php

namespace App\Entity;

use App\Repository\BankCardRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BankCardRepository::class)]
class BankCard
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $user_id;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $name;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $address;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $number;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $expiry_date;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $card_verification_value;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(?int $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(?string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getExpiryDate(): ?string
    {
        return $this->expiry_date;
    }

    public function setExpiryDate(?string $expiry_date): self
    {
        $this->expiry_date = $expiry_date;

        return $this;
    }

    public function getCardVerificationValue(): ?string
    {
        return $this->card_verification_value;
    }

    public function setCardVerificationValue(?string $card_verification_value): self
    {
        $this->card_verification_value = $card_verification_value;

        return $this;
    }

}
