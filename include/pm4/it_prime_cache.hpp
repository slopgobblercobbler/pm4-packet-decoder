#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItPrimeCacheDef {
    static constexpr std::uint8_t opcode = 0x44;
    static constexpr std::string_view name = "IT_PRIME_CACHE";
    static constexpr std::string_view desc = "Prefetch L1/L2 GPU cache lines for upcoming draw data buffers";
};
}
